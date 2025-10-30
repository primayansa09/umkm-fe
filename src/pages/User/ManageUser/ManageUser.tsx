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
import { DataInsert } from "../../../store/users/type";
import { createDataUser, updateDataUser } from "../../../api/dataUsers";
import ModalAlert from "../../../components/Modal/Modal";
import { z } from "zod";

const storeSchema = z.object({
  name: z.string().min(1, "Nama toko tidak boleh kosong"),
});

export function ManageUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemData, mode, IsEdit } = location.state || {};

  const [isEdit, setIsEdit] = useState<{ id: string; mode: string }>({
    id: itemData?.id || "",
    mode: mode || "",
  });

  console.log("isEdit:", isEdit);

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formDataUser, setFormDataUser] = useState<DataInsert>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    nameUser: false,
    phone: false,
  });

  const handleSubmit = async () => {
    setErrors({ nameUser: false, phone: false });

    const result = storeSchema.safeParse(formDataUser);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.nameStore = true;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    const dataJson = {
      name: formDataUser.name,
      email: formDataUser.email,
      address: formDataUser.address,
      Phone: formDataUser.phone,
    };

    try {
      if (isEdit.mode === "Edit") {
        //MODE EDIT
        const response = await updateDataUser(dataJson, isEdit.id);

        if (response.status === 200) {
          setModalTitle("Success");
          setModalContent(response.message || "Data user berhasil diperbarui");
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
            responseCreate.message || "Data user berhasil dibuat"
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
      setFormDataUser(itemData);
      setIsEdit({
        id: itemData.id,
        mode: mode || "Edit",
      });
    }
  }, [IsEdit, itemData, mode]);

  const clickCancel = () => {
    navigate("/master-data/data-user", { replace: true });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormDataUser({ ...formDataUser, password: value });

    // Regex validasi:
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!regex.test(value)) {
      setPasswordError(
        "Password harus minimal 8 karakter, mengandung huruf besar, angka, dan simbol (!@#$%^& dll)."
      );
    } else {
      setPasswordError("");
    }
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
              value={formDataUser.name}
              error={errors.nameUser}
              helperText={errors.nameUser ? "Nama toko tidak boleh kosong" : ""}
              onChange={(e) =>
                setFormDataUser({
                  ...formDataUser,
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
                Email
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataUser.email}
              onChange={(e) =>
                setFormDataUser({
                  ...formDataUser,
                  email: e.target.value,
                })
              }
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
                No Tlp/Handphone
                <span style={{ color: "red" }}>*</span>
              </InputLabel>
            </Grid>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDataUser.phone}
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
                    setFormDataUser({
                      ...formDataUser,
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
          {isEdit?.mode !== "Edit" && (
            <Grid direction="column" container size={6}>
              <Grid>
                <InputLabel
                  sx={{
                    ...layoutPrivateStyle.manageSubTitle,
                    marginTop: 1,
                  }}
                >
                  Password
                  <span style={{ color: "red" }}>*</span>
                </InputLabel>
              </Grid>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={formDataUser.password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
          )}
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
