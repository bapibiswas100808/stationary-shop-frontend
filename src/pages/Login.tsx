/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProjectForm from "../components/form/ProjectForm";
import ProjectInput from "../components/form/ProjectInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: "sumon@bapi.com",
    password: "123456",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Logged in Succesfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      toast.error(`${res.message}`, { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <ProjectForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <ProjectInput type="email" name="email" label="Email" />
        </div>
        <div>
          <ProjectInput type="password" name="password" label="Password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </ProjectForm>
    </Row>
  );
};

export default Login;
