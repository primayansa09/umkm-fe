import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { z } from "zod";
import logo from "../../assets/Logo_UMKM.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { login } from "../../store/auth";
import LoginCard from "../../components/Login/LoginCard";
import { layoutPrivateStyle } from "../../style/layout/private-route";

const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email tidak boleh kosong"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .min(1, "Password tidak boleh kosong"),
});

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error} = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  

  const handleLogin = async() => {
    const result = loginSchema.safeParse({email, password});

    if(!result.success){
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await dispatch(login({ email, password }));

      if (login.fulfilled.match(response)) {
        const { data } = response.payload;
        const { user, token } = data;

        localStorage.setItem("token", token);
        
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            token: token,
          })
        );

        navigate("/master-data/data-store");
      } else {
        console.error("Login gagal:", response.payload);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: layoutPrivateStyle.backgroundColor }}
    >
      <Stack padding={6}>
        <Grid
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "200px",
            }}
          />
        </Grid>
        <LoginCard
          email={email}
          password={password}
          errors={errors}
          error={error}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
        />
      </Stack>
    </Box>
  );
}
