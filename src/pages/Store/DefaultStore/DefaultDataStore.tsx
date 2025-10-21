import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { layoutPrivateStyle } from "../../../style/layout/private-route";
import { Data, DataFilter } from "../../../store/store/type";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { getDataStore, deleteData } from "../../../api/dataStore";

export function DefaultDataStore() {
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
      //    const filter: DataFilter = {
      //   filter: {
      //     name: searchData || "",
      //   },
      //   sortBy: null,
      //   order: null,
      //   pageSize: rowsPerPage,
      //   pageNumber: page + 1,
      // };

      const response = await getDataStore();
      setDataBind(response.data || []);
      // setFilteredData(response.data || []);
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
    if (searchData) {
      const filtered = dataBind.filter((item: any) =>
        item.codePenatua?.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dataBind);
    }
  }, [searchData, dataBind]);

  return (
    <Stack sx={layoutPrivateStyle.fixHeader}>
      <InputLabel
        sx={{ ...layoutPrivateStyle.manageTitleHeader, marginTop: 5 }}
      >
        Data Toko
      </InputLabel>
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid size={8.8}>
            <Button
              variant="contained"
              sx={layoutPrivateStyle.buttonAdd}
              onClick={handleManageStore}
            >
              Tambah Data
            </Button>
          </Grid>
          <Grid size={1}>
            <InputLabel
              sx={{
                ...layoutPrivateStyle.manageSubTitle,
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              Search :
            </InputLabel>
          </Grid>
          <Grid size={2}>
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              fullWidth
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              sx={{ marginBottom: "15px" }}
            />
          </Grid>
        </Grid>
        <TableContainer
          sx={layoutPrivateStyle.manageTableContainer}
          style={{ marginTop: 10, backgroundColor: "#FFFFFF" }}
        >
          <Table sx={{ minWidth: 720 }} size="small" aria-label="a dense table">
            <TableHead sx={layoutPrivateStyle.moduleTableHead}>
              <TableRow sx={layoutPrivateStyle.manageTableRow}>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Toko
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Alamat
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Telepon
                </TableCell>
                <TableCell
                  sx={{
                    ...layoutPrivateStyle.manageTableCell,
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 1 }}>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Loading data...
                  </TableCell>
                </TableRow>
              ) : filteredData && filteredData.length > 0 ? (
                filteredData.map((ex: any) => (
                  <TableRow
                    key={ex.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={layoutPrivateStyle.manageTableCell}>
                      {ex.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      {ex.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...layoutPrivateStyle.manageTableCell,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        gap={1}
                      >
                        <InputLabel
                          onClick={() => clickEditData(ex)}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                            marginBottom: "5px",
                          }}
                        >
                          <EditIcon />
                        </InputLabel>
                        <InputLabel
                          onClick={() => {
                            setSelectedId(ex.id);
                            setOpen(true);
                          }}
                          sx={{
                            ...layoutPrivateStyle.manageTitleAction,
                            cursor: "pointer",
                          }}
                        >
                          <DeleteIcon />
                        </InputLabel>
                        <ConfirmModal
                          open={open}
                          onClose={() => setOpen(false)}
                          onConfirm={() => {
                              if (selectedId) {
                                handleDelete(selectedId);
                              }
                            }}
                          title="Hapus Data"
                          message={`Apakah Anda yakin ingin menghapus data ini ?`}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow sx={layoutPrivateStyle.manageTableRow}>
                  <TableCell colSpan={8} align="center">
                    No Data Available.
                    <div>Please Click Search Button</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-start" mt={2}>
          <TablePagination
            component="div"
            count={filteredData ? filteredData.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Showing"
          />
        </Box>
      </Paper>
    </Stack>
  );
}
