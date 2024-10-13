import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import img from "../../img/drapp_logo.png";
import { useTheme } from "next-themes";
import "../../styles/index.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const { setTheme } = useTheme();
  const [selected, setSelected] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    user_name: "",
    password: "",
    names: "",
    last_names: "",
    employee_number: "",
    subzone: "",
    is_active: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = store.users;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    const success = await actions.login(userName, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setError("");
    const success = await actions.register(
      user.user_name,
      user.password,
      user.names,
      user.last_names,
      user.employee_number,
      user.subzone,
      user.is_active,
      user.role
    );

    if (success) {
      navigate("/");
    } else {
      setError("Error al crear el usuario");
    }
  };

  return (
    <>
      <div className="flex-col w-full mt-10">
        <Card className="m-auto max-w-full w-[340px] h-[auto]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmitLogin}
                >
                  <Input
                    isRequired
                    label="Nombre de Usuario"
                    placeholder=""
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Input
                    isRequired
                    label="Constraseña"
                    placeholder=""
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab
                key="sign-up"
                title="Sign up"
                className={users ? "" : "hidden"}
              >
                <form
                  className="flex flex-col gap-4 h-[auto]"
                  onSubmit={handleSubmitSignUp}
                >
                  <Input
                    isRequired
                    label="Nombre de Usuario"
                    placeholder=""
                    type="text"
                    name="user_name"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Nombres"
                    placeholder=""
                    type="text"
                    name="names"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Apellidos"
                    placeholder=""
                    type="text"
                    name="last_names"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Número de Empleado"
                    placeholder=""
                    type="text"
                    name="employee_number"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Sucursal"
                    placeholder=""
                    type="text"
                    name="subzone"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Estado"
                    placeholder=""
                    type="text"
                    name="is_active"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Rol"
                    placeholder=""
                    type="text"
                    name="role"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder=""
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit">
                      Sign up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
