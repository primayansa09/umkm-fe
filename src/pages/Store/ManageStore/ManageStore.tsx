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
} from "@mui/material";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { DataInsert } from "../../../store/store/type";
import { createDataStore, updateData } from "../../../api/dataStore";
import ModalAlert from "../../../components/Modal/Modal";

export function ManageStore() {
  const navigate = useNavigate();
  const [dataEdit, setDataEdit] = useState<{ id: string; mode: string }>({
    id: "",
    mode: "",
  });

  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>("");

  const [formDataStore, setFormDataStore] = useState<DataInsert>({
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    namaStore: false,
    phone: false,
  });

  const handleSubmit = async () => {
    const dataJson = {
      name: formDataStore.name,
      address: formDataStore.address,
      Phone: formDataStore.phone,
    };

    try {
      if (dataEdit.mode === "Edit") {
        //MODE EDIT
        const response = await updateData(dataJson, dataEdit.id);
        console.log("🟡 Respons dari API (Edit):", response);

        if (response.status === 200) {
          setModalTitle("Success");
          setModalContent(response.message || "Data successfully updated!");
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
        console.log("🟢 Respons dari API (Create):", responseCreate);

        if (responseCreate.status === 201) {
          setModalTitle("Success");
          setModalContent(
            responseCreate.message || "Data successfully created!"
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
    }
  }, [IsEdit, itemData]);

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
        <Grid container spacing={2} alignItems={"center"} marginTop={5}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Nama Toko
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataStore.name}
              onChange={(e) =>
                setFormDataStore({
                  ...formDataStore,
                  name: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              No Tlp/Handphone
              {/* <span style={{ color: "red" }}>*</span> */}
            </InputLabel>
          </Grid>
          <Grid size={4}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
              value={formDataStore.phone}
              onChange={(e) =>
                setFormDataStore({
                  ...formDataStore,
                  phone: e.target.value,
                })
              }
              error={errors.phone}
              helperText={errors.phone ? "Nama toko wajib diisi" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} marginTop={2}>
          <Grid size={2}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                marginLeft: "15px",
              }}
            >
              Alamat Toko
            </InputLabel>
          </Grid>
          <Grid size={4}>
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
          <Grid size={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...layoutPrivateStyle.buttonSubmit, width: "100%" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid size={2}>
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
          message={`Berhasil menambahkan data toko`}
        />
      </Paper>
    </Stack>
  );
}
