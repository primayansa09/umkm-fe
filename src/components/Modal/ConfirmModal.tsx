// import React from "react";
// import { Modal, Box, Typography, Button, Stack } from "@mui/material";

// interface ConfirmModalProps {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: (id: string) => void;
//   message?: string; // teks dinamis opsional
//   targetId?: string;
// }

// const modalStyle = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   borderRadius: 0,
//   boxShadow: 2,
//   p: 4,
//   width: 400,
//   textAlign: "center" as const,
// };

// const ConfirmModal: React.FC<ConfirmModalProps> = ({
//   open,
//   onClose,
//   onConfirm,
//   message = "", // default jika tidak dikirim
//    targetId,
// }) => {
//   const handleOkClick = async () => {
//     try {
//       // Jalankan aksi konfirmasi
//       await onConfirm(targetId ?? "");
//     } catch (err) {
//       console.error("Gagal menjalankan onConfirm:", err);
//     } finally {
//       // Tutup modal meskipun ada error
//       onClose();
//     }
//   };
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       BackdropProps={{
//         sx: {
//           backgroundColor: "rgba(0, 0, 0, 0)", // background transparan
//         },
//       }}
//     >
//       <Box sx={modalStyle}>
//         <Typography variant="h6" mb={3}>
//           {message}
//         </Typography>

//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Button
//             variant="contained"
//             onClick={handleOkClick}
//             sx={{
//               backgroundColor: "#0049AC",
//               "&:hover": { backgroundColor: "#003B8A" },
//             }}
//           >
//             OK
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onClose}
//             sx={{
//               backgroundColor: "#D32F2F",
//               "&:hover": { backgroundColor: "#B71C1C" },
//             }}
//           >
//             Batal
//           </Button>
//         </Stack>
//       </Box>
//     </Modal>
//   );
// };

// export default ConfirmModal;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  message?: string;
  title?: string;
  targetId?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  message = "Apakah Anda yakin ingin melanjutkan?",
  title = "Konfirmasi",
  targetId,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm(targetId ?? "");
    } catch (err) {
      console.error("Gagal menjalankan onConfirm:", err);
    } finally {
      onClose();
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)", // transparan
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "none", // hilangkan shadow hitam
          width: 400,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} id="confirm-dialog-title">
        {title}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography gutterBottom sx={{ textAlign: "center" }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            backgroundColor: "#0049AC",
            "&:hover": { backgroundColor: "#003B8A" },
          }}
        >
          OK
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#D32F2F",
            "&:hover": { backgroundColor: "#B71C1C" },
          }}
        >
          Batal
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ConfirmModal;