import { useState } from "react";
import {
  useGetProfile,
  useUpdateEmail,
  useChangePassword,
} from "../hook/useProfile";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomSnackbar from "../components/CustomSnackbar";
import useThemeStore from "../store/useThemeStore"; // 👈 استيراد الـ Theme Store

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

export default function Profile() {
  const mode = useThemeStore((state) => state.theme); // 👈 جلب حالة الـ theme
  const isDark = mode === "dark"; // 👈 متغير فحص للـ Dark Mode

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const { data: response, isLoading, isError } = useGetProfile();

  // استخراج الدالة مع حالة التحميل isPending لكل mutation
  const { mutate: UpdateEmail, isPending: isUpdatingEmail } = useUpdateEmail();
  const { mutate: ChangePassword, isPending: isChangingPassword } =
    useChangePassword();

  const [activeTab, setActiveTab] = useState(0);

  // حالة المدخلات
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  // 1. معالجة تحديث البريد
  const handleUpdateEmail = (NewEmail) => {
    console.log("newEmail", NewEmail);
    if (!NewEmail) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email",
        severity: "error",
      });
      return;
    }
    UpdateEmail(NewEmail, {
      onSuccess: () => {
        console.log("Email updated successfully");
        setEmail(""); // تصفير الحقل بعد النجاح
        setSnackbar({
          open: true,
          message: "Email updated successfully!",
          severity: "success",
        });
      },
      onError: (error) => {
        const ErrorMessage =
          error.response?.data?.message || "Failed to update email";
        console.error(ErrorMessage);
        setSnackbar({ open: true, message: ErrorMessage, severity: "error" });
      },
    });
  };

  // 2. معالجة تغيير كلمة السر
  const handleChangePassword = (passData) => {
    // التأكد من تطابق كلمة السر الجديدة
    if (passData.NewPassword !== passData.ConfirmNewPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
      return;
    }
    ChangePassword(passData, {
      onSuccess: () => {
        console.log("Password changed successfully", passData);
        setPasswords({
          CurrentPassword: "",
          NewPassword: "",
          ConfirmNewPassword: "",
        }); // تصفير الحقول
        setSnackbar({
          open: true,
          message: "Password changed successfully",
          severity: "success",
        });
        navigate("/auth/login");
      },
      onError: (error) => {
        const ErrorMessage =
          error.response?.data?.message || "Failed to change password";
        console.error(ErrorMessage);
        setSnackbar({ open: true, message: ErrorMessage, severity: "error" });
      },
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  // 👈 تنسيق موحد لحقول الإدخال يدعم الـ Dark Mode
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      color: isDark ? "#ffffff" : "#000000",
      "& fieldset": {
        borderColor: isDark ? "#444444" : "#cccccc",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "#666666" : "#aaaaaa",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary-color)",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#aaaaaa" : "inherit",
    },
  };

  // 👈 تنسيق الأزرار
  const buttonStyles = {
    backgroundColor: "var(--primary-color)",
    textTransform: "none",
    borderRadius: "8px",
    py: 1.2,
    boxShadow: "none",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "var(--primary-color)",
      opacity: 0.9,
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: isDark ? "#333333" : "#e0e0e0",
      color: isDark ? "#666666" : "#a1a1a1",
    },
  };

  const dividerStyle = {
    borderColor: isDark ? "#333333" : "rgba(0, 0, 0, 0.12)",
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "error.main" }}>
        Failed to load profile data.
      </Box>
    );
  }

  const user = response?.data;

  if (!user) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          color: isDark ? "#aaaaaa" : "text.secondary",
        }}
      >
        No profile data available.
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: { xs: 2, md: 4 },
          color: isDark ? "#ffffff" : "#000000",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: isDark ? "#ffffff" : "#1A1A2E",
          }}
        >
          My Account
        </Typography>

        <Paper
          elevation={isDark ? 0 : 2}
          sx={{
            borderRadius: "16px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            minHeight: 450,
            backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
            border: isDark ? "1px solid #2e2e2e" : "1px solid #F5F5F5",
            boxShadow: isDark
              ? "0px 4px 20px rgba(0, 0, 0, 0.4)"
              : "0px 4px 12px rgba(0, 0, 0, 0.02)",
          }}
        >
          {/* Navbar / Sidebar الجانبية */}
          <Box
            sx={{
              borderRight: { md: 1 },
              borderBottom: { xs: 1, md: 0 },
              borderColor: isDark ? "#2e2e2e" : "divider",
              backgroundColor: isDark ? "#171717" : "#FAF9FF",
              minWidth: { md: 240 },
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                "& .MuiTab-root": {
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  py: 2,
                  px: 3,
                  color: isDark ? "#aaaaaa" : "#525252",
                  "&.Mui-selected": {
                    color: "var(--primary-color)",
                    backgroundColor: isDark ? "#2a2238" : "#F3F1FF",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "var(--primary-color)",
                  width: "4px",
                  borderRadius: "4px",
                },
                display: { xs: "none", md: "flex" },
              }}
            >
              <Tab
                icon={<AccountCircleIcon sx={{ mr: 1.5 }} />}
                iconPosition="start"
                label="User Information"
              />
              <Tab
                icon={<ShoppingBagOutlinedIcon sx={{ mr: 1.5 }} />}
                iconPosition="start"
                label="Orders"
              />
              <Tab
                icon={<EditOutlinedIcon sx={{ mr: 1.5 }} />}
                iconPosition="start"
                label="Update Email"
              />
              <Tab
                icon={<LockOutlinedIcon sx={{ mr: 1.5 }} />}
                iconPosition="start"
                label="Change Password"
              />
            </Tabs>

            {/* التابات للشاشات الصغيرة (أفقية) */}
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                display: { xs: "flex", md: "none" },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  color: isDark ? "#aaaaaa" : "#525252",
                  "&.Mui-selected": {
                    color: "var(--primary-color)",
                    backgroundColor: isDark ? "#2a2238" : "#F3F1FF",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              <Tab label="User Info" />
              <Tab label="Orders" />
              <Tab label="Update Email" />
              <Tab label="Password" />
            </Tabs>
          </Box>

          {/* محتوى التاب النشط */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Tab 1: User Information */}
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                User Information
              </Typography>
              <Divider sx={{ mb: 3, ...dividerStyle }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: isDark ? "#e0e0e0" : "inherit" }}
                >
                  <strong>Full Name:</strong> {user.fullName || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: isDark ? "#e0e0e0" : "inherit" }}
                >
                  <strong>Email:</strong> {user.email || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: isDark ? "#e0e0e0" : "inherit" }}
                >
                  <strong>Phone:</strong> {user.phoneNumber || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: isDark ? "#e0e0e0" : "inherit" }}
                >
                  <strong>City:</strong> {user.city || "Not specified"}
                </Typography>
              </Box>
            </TabPanel>

            {/* Tab 2: Orders */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Orders ({user.orders?.length || 0})
              </Typography>
              <Divider sx={{ mb: 2, ...dividerStyle }} />

              {user.orders && user.orders.length > 0 ? (
                <List disablePadding>
                  {user.orders.map((order, index) => {
                    const formattedDate = order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A";

                    return (
                      <Box
                        key={order.id || index}
                        component="li"
                        sx={{ listStyle: "none" }}
                      >
                        <ListItem sx={{ px: 0, py: 1.5 }}>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  color: isDark ? "#ffffff" : "#000000",
                                }}
                              >
                                {`Order #${order.id || index + 1}`}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                sx={{
                                  color: isDark ? "#aaaaaa" : "text.secondary",
                                }}
                              >
                                {`Date: ${formattedDate} - Amount: $${
                                  order.amountPaid ?? 0
                                }`}
                              </Typography>
                            }
                          />
                          <Chip
                            label={order.status || "Pending"}
                            color={
                              order.status === "Active" ? "success" : "default"
                            }
                            size="small"
                            sx={{
                              ...(isDark &&
                                order.status !== "Active" && {
                                  backgroundColor: "#333333",
                                  color: "#ffffff",
                                }),
                            }}
                          />
                        </ListItem>
                        {index < user.orders.length - 1 && (
                          <Divider sx={dividerStyle} />
                        )}
                      </Box>
                    );
                  })}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#aaaaaa" : "text.secondary", py: 2 }}
                >
                  No orders found.
                </Typography>
              )}
            </TabPanel>

            {/* Tab 3: Update Email */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Update Email Address
              </Typography>
              <Divider sx={{ mb: 3, ...dividerStyle }} />
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateEmail(email);
                }}
                sx={{
                  maxWidth: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="New Email"
                  type="email"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your new email"
                  sx={textFieldStyles}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdatingEmail}
                  sx={buttonStyles}
                >
                  {isUpdatingEmail ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Box>
            </TabPanel>

            {/* Tab 4: Change Password */}
            <TabPanel value={activeTab} index={3}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Change Password
              </Typography>
              <Divider sx={{ mb: 3, ...dividerStyle }} />
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword(passwords); // تمرير الكائن المحدث
                }}
                sx={{
                  maxWidth: 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Current Password"
                  type="password"
                  required
                  fullWidth
                  value={passwords.CurrentPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      CurrentPassword: e.target.value,
                    })
                  }
                  sx={textFieldStyles}
                />
                <TextField
                  label="New Password"
                  type="password"
                  required
                  fullWidth
                  value={passwords.NewPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      NewPassword: e.target.value,
                    })
                  }
                  sx={textFieldStyles}
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  required
                  fullWidth
                  value={passwords.ConfirmNewPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      ConfirmNewPassword: e.target.value,
                    })
                  }
                  sx={textFieldStyles}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isChangingPassword}
                  sx={buttonStyles}
                >
                  {isChangingPassword ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </Box>
            </TabPanel>
          </Box>
        </Paper>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
