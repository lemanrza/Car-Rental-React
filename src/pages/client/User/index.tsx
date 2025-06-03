import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import UserService from "@/services/requests/UserService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changePasswordSchema, editProfileSchema } from "@/utils/validations";
import { setUser } from "@/redux/features/AuthSlice";
import RentalService from "@/services/requests/RentalService";
import type { Rental } from "@/types/rentalType";
const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [hostRequestLoading, setHostRequestLoading] = useState(false);
  const [rentals, setRentals] = useState<Rental[]>([])
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      const data = await RentalService.getAll()
      setRentals(data)
    }
    fetchRentals(
    )
  },[])

  const usersRentals=rentals.filter((rental)=>rental.userId===user?.id)
  const handleEditProfileSubmit = async (values: { username: string; email: string; image: string }) => {
    if (!user) return;

    try {
      const updatedUser = await UserService.partialUpdate(user.id, {
        username: values.username,
        email: values.email,
      });
      dispatch(setUser(updatedUser));
      setIsEditProfileOpen(false);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoadingChangePassword(true);
    try {
      await UserService.updateUserPassword({ currentPassword, newPassword });
      alert("Password changed successfully!");
      setIsChangePasswordOpen(false);
    } catch (error: any) {
      alert(error.message || "Failed to change password.");
      console.error(error);
    } finally {
      setLoadingChangePassword(false);
    }
  };

  const handleAddBalanceClick = () => {
    setAmount("");
    setIsBalanceModalOpen(true);
  };

  const handleBalanceSubmit = async () => {
    if (!user) return;

    if (amount === "" || amount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    try {
      const newBalance = (user.balance || 0) + amount;
      const updatedUser = await UserService.partialUpdate(user.id, { balance: newBalance });

      dispatch(setUser(updatedUser));
      setIsBalanceModalOpen(false);
    } catch (error) {
      alert("Failed to update balance. Please try again.");
      console.error(error);
    }
  };

  const handleBecomeHost = async () => {
    if (!user) return;
    setHostRequestLoading(true);
    try {
      const updatedUser = await UserService.partialUpdate(user.id, { hostRequest: true });
      dispatch(setUser(updatedUser));
    } catch (error) {
      alert("Failed to send host request. Please try again.");
      console.error(error);
    } finally {
      setHostRequestLoading(false);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }
  console.log(user)
  return (
    <div className="flex flex-wrap gap-8 p-6 mt-15 bg-gray-50 dark:bg-gray-900 min-h-screen justify-center">
      <Card className="w-full max-w-sm p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            {user.profileImage ? (
              <AvatarImage src={user.profileImage} alt="Profile" />
            ) : (
              <AvatarFallback>
                {user.username ? user.username.slice(0, 2).toUpperCase() : "NA"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400">{user?.role}</p>
          </div>
        </div>

        <CardContent className="space-y-4 mt-4">
          <div>
            <p className="text-sm font-semibold">Username</p>
            <p className="text-sm text-muted-foreground dark:text-gray-300">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p className="text-sm text-muted-foreground dark:text-gray-300">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Member Since</p>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Balance</p>
            <p className="text-sm font-bold">
              $ {user?.balance ? user?.balance.toFixed(2) : "0.00"}
            </p>
          </div>
        </CardContent>

        <div className="flex flex-col gap-3 mt-6 px-2">
          <Button variant="outline" className="w-full" onClick={() => setIsEditProfileOpen(true)}>
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Change Password
          </Button>
          <Button variant="outline" className="w-full" onClick={handleAddBalanceClick}>
            Add Balance
          </Button>

          {user?.role === "CLIENT" && !user.hostRequest && (
            <Button
              className="w-full bg-black text-white hover:bg-black/80"
              onClick={handleBecomeHost}
              disabled={hostRequestLoading}
            >
              {hostRequestLoading ? "Requesting..." : "Become a Host"}
            </Button>
          )}

          {user?.role === "CLIENT" && user.hostRequest && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Your host request is pending approval.
            </p>
          )}
        </div>
      </Card>

      <div className="w-full max-w-5xl">
        <Tabs defaultValue="rentals" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <TabsList className="mb-6 border-b border-gray-300 dark:border-gray-700">
            <TabsTrigger value="rentals" className="px-6 py-2">
              My Bookings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="rentals" className="text-gray-700 dark:text-gray-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersRentals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No rentals found.
                    </TableCell>
                  </TableRow>
                ) : (
                  usersRentals.map((rental) => {

                    return (
                      <TableRow
                        key={rental.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <TableCell>{rental ? rental.carId : "Unknown Car"}</TableCell>
                        <TableCell className="font-medium">
                          {new Date(rental.startDate).toLocaleDateString()} <br />{" "}
                          {new Date(rental.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{rental.totalPrice}</TableCell>
                        <TableCell
                          className="text-center"
                        >
                          {rental.status}
                        </TableCell>

                        <TableCell className="text-center space-x-2">
                          <Link to={`/cars/${rental.carId}`}>
                            <Button variant="ghost" size="icon" title="View Details">
                              <Eye />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <Formik
            initialValues={{
              username: user?.username || "",
              email: user?.email || "",
              image: user.profileImage || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            }}
            validationSchema={editProfileSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleEditProfileSubmit(values);
              setSubmitting(false);
            }}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage name="username" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <DialogFooter className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditProfileOpen(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={isBalanceModalOpen} onOpenChange={setIsBalanceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Balance</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Amount to add</label>
            <Input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              autoFocus
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsBalanceModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBalanceSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                await handleChangePassword({
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                });
                setSubmitting(false);
              } catch (error: any) {
                setFieldError("currentPassword", error.message || "Failed to change password");
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <Field
                    name="currentPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    autoFocus
                  />
                  <ErrorMessage name="currentPassword" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <Field
                    name="newPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="At least 6 chars, uppercase, lowercase and number"
                  />
                  <ErrorMessage name="newPassword" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <DialogFooter className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)} disabled={isSubmitting || loadingChangePassword}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || loadingChangePassword}>
                    {loadingChangePassword || isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
