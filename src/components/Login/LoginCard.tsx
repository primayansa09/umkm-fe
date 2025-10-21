import React from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { layoutPrivateStyle } from "../../style/layout/private-route";

interface LoginCardProps {
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  error?: string | null;
  loading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  email,
  password,
  errors,
  error,
  loading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        width: 360,
        mx: "auto",
        borderRadius: 3,
        bgcolor: layoutPrivateStyle.backgroundColor,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        mb={3}
        fontWeight={600}
        color="black"
      >
        Login
      </Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            fullWidth
            size="small"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            fullWidth
            size="small"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>

        {error && (
          <Grid size={12}>
            <Typography color="error" textAlign="center" variant="body2">
              {error}
            </Typography>
          </Grid>
        )}

        <Grid size={12} display='flex' justifyContent="center">
          <Button
            variant="contained"
            fullWidth
            onClick={onSubmit}
            disabled={loading}
            sx={{
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: layoutPrivateStyle.buttonSubmit,
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginCard;
