/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Col, Row } from "antd";
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
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "90vh",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Col xs={24} sm={22} md={18} lg={12}>
        <Card
          bordered={false}
          style={{
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "30px",
            }}
          >
            Login
          </h2>

          <ProjectForm onSubmit={onSubmit}>
            {/* Email input */}
            <ProjectInput type="email" name="email" label="Email" />
            {/* Password input */}
            <ProjectInput type="password" name="password" label="Password" />
            {/* Register Button */}
            <Button
              block
              htmlType="submit"
              style={{
                backgroundColor: "green",
                color: "white",
                marginTop: "20px",
                borderRadius: "5px",
                height: "40px",
              }}
            >
              Login
            </Button>
          </ProjectForm>

          <p
            style={{ display: "block", textAlign: "center", marginTop: "15px" }}
          >
            Do not have an account? <a href="/register">Register</a>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
