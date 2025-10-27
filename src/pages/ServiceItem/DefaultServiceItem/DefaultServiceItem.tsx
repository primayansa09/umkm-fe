import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { Data } from "../../../store/serviceItem/type";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { getDataUser, deleteDataUser } from "../../../api/dataServiceItem";
import TableComponent from "../../../components/Table/TableComponent";
import SearchField from "../../../components/SearchComponent/SearchComponent";

export function DefaultServiceItem() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataBind, setDataBind] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getDataUser();
      setDataBind(response.data || []);
      console.log("data", response.data);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleManageServiceItem = () => {
    navigate("/manage-service-item", { replace: true });
  };

  const clickEditData = (item: Data) => {
    navigate("/manage-service-item", {
      state: {
        itemData: item,
        mode: "Edit",
        IsEdit: true,
      },
    });
  };

  const handleAskDelete = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

    const handleDelete = async (id: string) => {
      try {
        const response = await deleteDataUser(id);
        console.log("Data berhasil dihapus:", response);

        setOpen(false);
        fetchData();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    };

  useEffect(() => {
    const handler = setTimeout(() => {
      const search = searchData.trim().toLowerCase();

      if (search) {
        const filtered = dataBind.filter((item: any) =>
          item.name?.toLowerCase().includes(searchData.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(dataBind);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchData, dataBind]);

  const TableColumn = [
    { field: "name", headerName: "Nama Item", align: "center" as const },
    { field: "Description", headerName: "Description", align: "center" as const },
    { field: "Price", headerName: "Harga", align: "center" as const },
    { field: "Unit", headerName: "Type", align: "center" as const },
  ];

  return (
    <Stack
      sx={{
        ...layoutPrivateStyle.fixHeader,
        ...layoutPrivateStyle.backgroundGeneral,
      }}
    >
      <Grid container spacing={2} marginBottom={3}>
        <Grid size={10.3}>
          <InputLabel
            sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
          >
            Data Service Item
          </InputLabel>
        </Grid>
        <Grid size={1}>
          <Button
            variant="contained"
            sx={{ ...layoutPrivateStyle.buttonAdd, marginTop: 5 }}
            onClick={handleManageServiceItem}
          >
            <AddIcon /> Tambah Item
          </Button>
        </Grid>
      </Grid>
      <Paper sx={layoutPrivateStyle.backgroundCard}>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          marginTop={2}
          marginBottom={1}
        >
          <SearchField
            placeholder="Search service item"
            value={searchData}
            onChange={(value) => setSearchData(value)}
            sx={layoutPrivateStyle.search}
          />
        </Grid>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <CircularProgress color="warning" />
          </div>
        ) : (
          <TableComponent
            columns={TableColumn}
            data={filteredData ?? []}
            onEdit={clickEditData}
            onDelete={handleAskDelete}
          />
        )}
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleDelete}
          targetId={selectedId ?? ""}
          title="Hapus Data"
          message={`Apakah Anda yakin ingin menghapus data ini ?`}
        />
        <Box display="center" justifyContent="center" marginBottom={2} marginTop={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Box>
      </Paper>
    </Stack>
  );
}
