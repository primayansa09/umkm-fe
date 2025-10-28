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
  InputAdornment,
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { DataInsert } from "../../../store/serviceItem/type";
import { createDataUser, updateDataUser } from "../../../api/dataServiceItem";
import ModalAlert from "../../../components/Modal/Modal";
import { z } from "zod";

const storeSchema = z.object({
  name: z.string().min(1, "Nama toko tidak boleh kosong"),
});

export function ManageServiceItem() {
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

  const [formDataServiceItem, setFormDataServiceItem] = useState<DataInsert>({
    name: "",
    Description: "",
    Price: 0,
    Unit: "",
  });

  const [errors, setErrors] = useState({
    nameItem: false,
  });

  const handleSubmit = async () => {
    setErrors({ nameItem: false });

    const result = storeSchema.safeParse(formDataServiceItem);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = true;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    const dataJson = {
      name: formDataServiceItem.name,
      Description: formDataServiceItem.Description,
      Price: formDataServiceItem.Price,
      Unit: formDataServiceItem.Unit,
    };

    try {
      if (dataEdit.mode === "Edit") {
        //MODE EDIT
        const response = await updateDataUser(dataJson, dataEdit.id);

        if (response.status === 200) {
          setModalTitle("Success");
          setModalContent(
            response.message || "Data service item berhasil diperbarui"
          );
        } else {
          setModalTitle("FAILED !!!");
          setModalContent(
            response.message || "Terjadi kesalahan saat memperbarui data."
          );
        }

        setOpenModal(true);
      } else {
        //MODE CREATE
        const responseCreate = await createDataUser(dataJson);

        if (responseCreate.status === 201) {
          setModalTitle("Success");
          setModalContent(
            responseCreate.message || "Data service item berhasil dibuat"
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
      setFormDataServiceItem(itemData);
      setDataEdit({
        id: itemData.id,
        mode: mode || "Edit",
      });
    }
  }, [IsEdit, itemData, mode]);

  const clickCancel = () => {
    navigate("/service-item", { replace: true });
  };

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Data User
      </InputLabel>
      <Paper style={{ padding: 16 }}>
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
                Nama
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataServiceItem.name}
              error={errors.nameItem}
              helperText={
                errors.nameItem ? "Nama service item tidak boleh kosong" : ""
              }
              onChange={(e) =>
                setFormDataServiceItem({
                  ...formDataServiceItem,
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
                Harga
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={
                formDataServiceItem.Price
                  ? formDataServiceItem.Price.toLocaleString("id-ID")
                  : ""
              }
              onChange={(e) => {
                // Ambil hanya angka dari input
                const rawValue = e.target.value.replace(/\D/g, "");

                // Ubah ke number
                const numericValue = Number(rawValue);

                // Update state
                setFormDataServiceItem({
                  ...formDataServiceItem,
                  Price: numericValue,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid direction="column" container size={5.9}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                  marginTop: 1,
                }}
              >
                Type
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataServiceItem.Unit}
              onChange={(e) =>
                setFormDataServiceItem({
                  ...formDataServiceItem,
                  Unit: e.target.value,
                })
              }
            />
          </Grid>
          <Grid direction="column" container size={6}></Grid>
          <Grid direction="column" container size={12}>
            <Grid>
              <InputLabel
                sx={{
                  ...layoutPrivateStyle.manageSubTitle,
                  marginTop: 1,
                }}
              >
                Description
              </InputLabel>
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
                value={formDataServiceItem.Description}
                onChange={(e) =>
                  setFormDataServiceItem({
                    ...formDataServiceItem,
                    Description: e.target.value,
                  })
                }
              />
            </Grid>
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
