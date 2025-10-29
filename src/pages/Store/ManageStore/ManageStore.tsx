import React, { useState, useEffect } from "react";
import { Form, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Paper,
  Switch,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { DataInsert } from "../../../store/store/type";
import { createDataStore, updateData } from "../../../api/dataStore";
import ModalAlert from "../../../components/Modal/Modal";
import { z } from "zod";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const storeSchema = z.object({
  name: z.string().min(1, "Nama toko tidak boleh kosong"),
});

const label = { inputProps: { "aria-label": "Color switch demo" } };

export function ManageStore() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [dataEdit, setDataEdit] = useState<{ id: string; mode: string }>({
    id: itemData?.id || "",
    mode: mode || "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [formDataStore, setFormDataStore] = useState<DataInsert>({
    name: "",
    address: "",
    phone: "",
    is_active: false,
  });

  const [errors, setErrors] = useState({
    nameStore: false,
    phone: false,
  });

  const handleSubmit = async () => {
    setErrors({ nameStore: false, phone: false });

    const result = storeSchema.safeParse(formDataStore);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.nameStore = true;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    const dataJson = {
      name: formDataStore.name,
      address: formDataStore.address,
      Phone: formDataStore.phone,
    };

    try {
      if (dataEdit.mode === "Edit") {
        //MODE EDIT
        const response = await updateData(dataJson, dataEdit.id);

        if (response.status === 200) {
          setModalTitle("Success");
          setModalContent(response.message || "Data toko berhasil diperbarui");
        } else {
          setModalTitle("FAILED !!!");
          setModalContent(
            response.message || "Terjadi kesalahan saat memperbarui data."
          );
        }

        setOpenModal(true);
      } else {
        //MODE CREATE
        const responseCreate = await createDataStore(dataJson);

        if (responseCreate.status === 201) {
          setModalTitle("Success");
          setModalContent(
            responseCreate.message || "Data toko berhasil dibuat"
          );
        } else {
          setModalTitle("FAILED !!!");
          setModalContent(
            responseCreate.message || "Terjadi kesalahan saat menyimpan data."
          );
        }

        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      setModalTitle("FAILED !!!");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (IsEdit && itemData) {
      setFormDataStore(itemData);
      setDataEdit({
        id: itemData.id,
        mode: mode || "Edit",
      });
    }
  }, [IsEdit, itemData, mode]);

  const clickCancel = () => {
    navigate("/master-data/data-store", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Master Data Store
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container size={1} direction="column" justifyContent="flex-end" alignItems="flex-end">
          <InputLabel
            sx={{
              ...layoutPrivateStyle.manageSubTitle,
              marginRight: "9px",
            }}
          >
            Status
          </InputLabel>
          <Switch
            {...label}
            defaultChecked
            color="warning"
            checked={formDataStore.is_active}
            onChange={(e) =>
              setFormDataStore({
                ...formDataStore,
                is_active: e.target.checked,
              })
            }
          />
        </Grid>
        <Grid
          container
          style={{ marginTop: "5px" }}
          justifyContent="space-between"
        >
          <Grid direction="column" container size={5.9}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                Nama Toko
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataStore.name}
              error={errors.nameStore}
              helperText={
                errors.nameStore ? "Nama toko tidak boleh kosong" : ""
              }
              onChange={(e) =>
                setFormDataStore({
                  ...formDataStore,
                  name: e.target.value,
                })
              }
            />
          </Grid>
          <Grid direction="column" container size={6}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                No Tlp/Handphone
                {/* <span style={{ color: "red" }}>*</span> */}
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataStore.phone}
              helperText={errors.phone ? "Nomor HP harus 10–13 digit" : ""}
              FormHelperTextProps={{
                sx: { color: "red" },
              }}
              onChange={(e) => {
                const value = e.target.value;

                // Hanya izinkan angka (0–9)
                if (/^\d*$/.test(value)) {
                  // Batasi maksimal 13 digit
                  if (value.length <= 13) {
                    setFormDataStore({
                      ...formDataStore,
                      phone: value,
                    });

                    // Validasi: panjang harus antara 10–13 digit
                    if (value.length >= 10 && value.length <= 13) {
                      setErrors((prev) => ({ ...prev, phone: false }));
                    } else {
                      setErrors((prev) => ({ ...prev, phone: true }));
                    }
                  }
                }
              }}
            />
          </Grid>
          <Grid direction="column" container size={6} marginTop={1}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                }}
              >
                Alamat Toko
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "600px" }}
              multiline
              rows={10}
              InputProps={{
                sx: {
                  height: 200,
                  padding: "0 8px",
                  alignItems: "flex-start",
                },
              }}
              value={formDataStore.address}
              onChange={(e) =>
                setFormDataStore({
                  ...formDataStore,
                  address: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          marginTop={2}
        >
          <Grid size={1}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
          <Grid size={1}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonCancel, width: "100%" }}
              onClick={clickCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <ModalAlert
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            if (modalTitle === "Success") navigate("/master-data/data-store");
          }}
          title="Success"
          message={modalContent}
        />
      </Paper>
    </Stack>
  );
}
