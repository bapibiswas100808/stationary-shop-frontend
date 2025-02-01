/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import ProjectForm from "../components/form/ProjectForm";
import ProjectInput from "../components/form/ProjectInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { useRegisterMutation } from "../redux/features/user/user.api";
import { setUser } from "../redux/features/user/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register] = useRegisterMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering User");

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await register(userInfo);
      console.log(res.data);

      if ("error" in res.data) {
        console.log("error happens");
        const errorMessage = res.data?.message || "Registration failed";
        toast.error(errorMessage, { id: toastId });
      } else {
        dispatch(setUser(res.data));
        toast.success("Registered Successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <ProjectForm onSubmit={onSubmit}>
        <ProjectInput type="text" name="name" label="name" />
        <ProjectInput type="email" name="email" label="Email" />

        <ProjectInput type="password" name="password" label="Password" />

        <Button htmlType="submit">Register</Button>
      </ProjectForm>
    </Row>
  );
};

export default Register;
