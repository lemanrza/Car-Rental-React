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
import { useWishlist } from "@/hooks/useWishlist";
import type { RootState } from "@/redux/store";
import UserService from "@/services/requests/UserService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changePasswordSchema, editProfileSchema } from "@/utils/validations";
import { setUser } from "@/redux/features/AuthSlice";
const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // const [cars, setCars] = useState<CarType[]>([]);
  const [hostRequestLoading, setHostRequestLoading] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const data = await CarService.getAll();
  //       setCars(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching cars", error);
  //     }
  //   };
  //   fetchCars();
  // }, []);

  const { toggleApartment } = useWishlist(user?.id);

  // const userBookedApartments = useMemo(() => {
  //   if (!user || !cars.length) return [];
  //   if (!user.rentals || user.rentals.length === 0) return [];

  //   return user.rentals.map((rental) => cars.find((a) => a.id === rental.carId));
  // }, [user, cars]);

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

  console.log(user)
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

          {user?.role === "OWNER" && !user.hostRequest && (
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
        <Tabs defaultValue="wishlist" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <TabsList className="mb-6 border-b border-gray-300 dark:border-gray-700">
            <TabsTrigger value="wishlist" className="px-6 py-2">
              WishList
            </TabsTrigger>
            <TabsTrigger value="bookings" className="px-6 py-2">
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishlist" className="text-gray-700 dark:text-gray-300">
            <div className="grid sm:grid-cols-2 gap-6">
              {user?.wishlist?.map((car) => (
                <div
                  key={car.id}
                  className="flex w-full max-w-md bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow border dark:border-gray-600"
                >
                  <div className="w-1/3 bg-gray-200 flex items-center justify-center">
                    {car.coverImage ? (
                      <img
                        src={car.coverImage}
                        alt={car.model}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400  dark:text-gray-300 text-4xl">🖼️</div>
                    )}
                  </div>

                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{car.model}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-800 dark:text-gray-300 mt-1">
                        <span>★</span>
                        <span>{car.avgRating ?? "N/A"}</span>
                      </div>
                      <p className="mt-2 text-base font-bold text-gray-900 dark:text-gray-100">
                        ${car.price}{" "}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ night</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Link
                        to={`/cars/${car.id}`}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => toggleApartment(car.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="bookings" className="text-gray-700 dark:text-gray-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Apartment</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user?.rentals?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No rentals found.
                    </TableCell>
                  </TableRow>
                ) : (
                  user?.rentals?.map((rental) => {

                    return (
                      <TableRow
                        key={rental.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <TableCell>{rental ? rental.car?.model : "Unknown Car"}</TableCell>
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
