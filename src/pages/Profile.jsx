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
import { useNavigate,} from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomSnackbar from "../components/CustomSnackbar"
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
  const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  
  const { data: response, isLoading, isError } = useGetProfile();
 
  // استخراج الدالة مع حالة التحميل isPending لكل mutation
  const { mutate: UpdateEmail, isPending: isUpdatingEmail } = useUpdateEmail();
  const { mutate: ChangePassword, isPending: isChangingPassword } = useChangePassword();

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
    console.log("newEmail",NewEmail);
    if (!NewEmail) 
      {  
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
        setSnackbar({ open: true, message: "Email updated successfully!", severity: "success" });

      },
      onError: (error) => {
        const ErrorMessage =
          error.response?.data?.message || "Failed to update email";
        console.error(ErrorMessage);
        setSnackbar({ open: true, message: ErrorMessage, severity: "error" });

      },
    });
  };

  // 2. معالجة تغيير كلمة السر (إصلاح النطاق و const)
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
        console.log("Password changed successfully",passData);
        setPasswords({ CurrentPassword: "", NewPassword: "", ConfirmNewPassword: "" }); // تصفير الحقول
        setSnackbar({ open: true, message: "Password changed successfully", severity: "success" });
       navigate("/auth/login")
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
  if (reason === 'clickaway') return;
  setSnackbar({ ...snackbar, open: false });
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
      <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No profile data available.
      </Box>
    );
  }

  return (
    <>
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 3, color: "#1A1A2E" }}
      >
        My Account
      </Typography>

      <Paper
        elevation={2}
        sx={{
          borderRadius: "16px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          minHeight: 450,
        }}
      >
        {/* Navbar / Sidebar الجانبية */}
        <Box
          sx={{
            borderRight: { md: 1 },
            borderBottom: { xs: 1, md: 0 },
            borderColor: "divider",
            backgroundColor: "#FAF9FF",
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
                color: "#525252",
                "&.Mui-selected": {
                  color: "var(--primary-color)",
                  backgroundColor: "#F3F1FF",
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
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
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
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1">
                <strong>Full Name:</strong> {user.fullName || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phoneNumber || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>City:</strong> {user.city || "Not specified"}
              </Typography>
            </Box>
          </TabPanel>

          {/* Tab 2: Orders */}
          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Orders ({user.orders?.length || 0})
            </Typography>
            <Divider sx={{ mb: 2 }} />

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
                          primary={`Order #${order.id || index + 1}`}
                          secondary={`Date: ${formattedDate} - Amount: $${
                            order.amountPaid ?? 0
                          }`}
                        />
                        <Chip
                          label={order.status || "Pending"}
                          color={
                            order.status === "Active" ? "success" : "default"
                          }
                          size="small"
                        />
                      </ListItem>
                      {index < user.orders.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                No orders found.
              </Typography>
            )}
          </TabPanel>

          {/* Tab 3: Update Email */}
          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Update Email Address
            </Typography>
            <Divider sx={{ mb: 3 }} />
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
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isUpdatingEmail}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1.2,
                }}
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
            <Divider sx={{ mb: 3 }} />
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
                  setPasswords({ ...passwords, CurrentPassword: e.target.value })
                }
              />
              <TextField
                label="New Password"
                type="password"
                required
                fullWidth
                value={passwords.NewPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, NewPassword: e.target.value })
                }
              />
              <TextField
                label="Confirm New Password"
                type="password"
                required
                fullWidth
                value={passwords.ConfirmNewPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, ConfirmNewPassword: e.target.value })
                }
              />
              <Button
                variant="contained"
                type="submit"
                disabled={isChangingPassword}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1.2,
                }}
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
