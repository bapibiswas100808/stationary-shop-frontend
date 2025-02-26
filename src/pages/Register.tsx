/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Col, Row } from "antd";
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
            Register
          </h2>

          <ProjectForm onSubmit={onSubmit}>
            {/* Name input */}
            <ProjectInput type="text" name="name" label="Name" />
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
              Register
            </Button>
          </ProjectForm>

          <p
            style={{ display: "block", textAlign: "center", marginTop: "15px" }}
          >
            Already have an account? <a href="/login">Login</a>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
