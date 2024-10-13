import React, { useContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { DeleteIcon } from "../../img/icons/DeleteIcon.jsx";
import { SearchIcon } from "../../img/icons/SearchIcon.jsx";
import { CreateUsers } from "../component/CreateUsers.jsx";
import { EditUsers } from "../component/EditUsers.jsx";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
} from "@nextui-org/react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

export const Users = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useTokenExpiration();

  const filteredItems = useMemo(() => {
    let filteredUsers = [...store.users];

    if (filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.user_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.is_active ? statusFilter === "active" : statusFilter === "inactive"
      );
    }

    return filteredUsers;
  }, [store.users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const topContent = (
    <div className="flex justify-between gap-3 items-center">
      <div className="flex justify-start gap-3 items-center">
        <span className="text-default-400 text-lg">
          Total usuarios : {store.users.length}
        </span>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <Input
          isClearable
          placeholder="Buscar por usuario..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full sm:max-w-[44%]"
          startContent={<SearchIcon />}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button>Estado</Button>
          </DropdownTrigger>
          <DropdownMenu
            selectedKeys={statusFilter}
            onSelectionChange={setStatusFilter}
          >
            <DropdownItem key="all">Todos</DropdownItem>
            <DropdownItem key="active">Activo</DropdownItem>
            <DropdownItem key="inactive">Inactivo</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>
          <CreateUsers />
        </div>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="flex justify-center mt-4">
      <Pagination showControls page={page} total={pages} onChange={setPage} />
    </div>
  );

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
      return;
    }
    actions.getMe();
    actions.getUsers();
  }, []);

  return (
    <>
      <div className="flex justify-start gap-4 mt-4">
        {" "}
        <span className="text-lg font-bold"> Gestor de Usuarios</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron usuarios</div>
      )}
      <Table
        aria-label="Tabla de usuarios"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>Nombre(s)</TableColumn>
          <TableColumn>Apellidos</TableColumn>
          <TableColumn>N° de Empleado</TableColumn>
          <TableColumn>Zona</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.user_name}</TableCell>
              <TableCell>{user.names}</TableCell>
              <TableCell>{user.last_names}</TableCell>
              <TableCell>{user.employee_number}</TableCell>
              <TableCell>{user.subzone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip
                  color={statusColorMap[user.is_active ? "active" : "inactive"]}
                >
                  {user.is_active ? "Activo" : "Inactivo"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <EditUsers user={user} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
