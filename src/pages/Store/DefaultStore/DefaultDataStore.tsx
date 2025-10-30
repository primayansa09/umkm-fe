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
import { Data } from "../../../store/store/type";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { getDataStore, deleteData } from "../../../api/dataStore";
import TableComponent from "../../../components/Table/TableComponent";
import SearchField from "../../../components/SearchComponent/SearchComponent";

export function DefaultDataStore() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [dataBind, setDataBind] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      //    const filter: DataFilter = {
      //   filter: {
      //     name: searchData || "",
      //   },
      //   sortBy: null,
      //   order: null,
      //   pageSize: rowsPerPage,
      //   pageNumber: page + 1,
      // };

      const response = await getDataStore({
        pageNumber: page,
        pageSize: rowsPerPage,
      });
      setDataBind(response.data || []);
      // setFilteredData(response.data || []);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
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

  const handleManageStore = () => {
    navigate("/manage-store", { replace: true });
  };

  const clickEditData = (item: Data) => {
    navigate("/manage-store", {
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
      const response = await deleteData(id);
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
    { field: "name", headerName: "Toko", align: "center" as const },
    { field: "address", headerName: "Alamat", align: "center" as const },
    { field: "phone", headerName: "Telepon", align: "center" as const },
    {
      field: "is_active",
      headerName: "Status",
      align: "center" as const,
      render: (row: any) => (
        <Typography
          sx={{
            backgroundColor: row.is_active
              ? "rgba(0, 128, 0, 0.1)"
              : "rgba(255, 0, 0, 0.1)",
            color: row.is_active ? "green" : "red",
            borderRadius: "8px",
            px: 1,
            py: 0.5,
            padding: "4px 12px",
            fontSize: "0.9rem",
            display: "inline-block",
          }}
        >
          {row.is_active ? "Aktif" : "Tidak Aktif"}
        </Typography>
      ),
    },
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
            Data Toko
          </InputLabel>
        </Grid>
        <Grid size={1}>
          <Button
            variant="contained"
            sx={{ ...layoutPrivateStyle.buttonAdd, marginTop: 5 }}
            onClick={handleManageStore}
          >
            <AddIcon /> Tambah Toko
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
            value={searchData}
            onChange={(value) => setSearchData(value)}
            placeholder="Search toko"
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
        <Box display="center" justifyContent="center" marginBottom={2}>
          <Pagination
            count={Math.max(1, Math.ceil(totalData / rowsPerPage))}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={layoutPrivateStyle.paginationTheme}
          />
        </Box>
      </Paper>
    </Stack>
  );
}
