'use client';
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../../../lib/firebaseConfig";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const displayName = `${firstName} ${lastName}`;
            let photoURL = '';

            if (profilePicture) {
                // Upload profile picture to storage and get the URL
                // Assume we have a function `uploadProfilePicture` to handle this
                photoURL = await uploadProfilePicture(profilePicture);
            }

            await updateProfile(user, {
                displayName,
                photoURL,
            });

            await sendEmailVerification(user);
            toast.success("Verification email sent!");

            setMessage("Registration Successful! Please check your email for verification.");

            // Clear form fields
            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setProfilePicture(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const uploadProfilePicture = async (file: File) => {
        // Implement function to upload profile picture to storage and return the URL
        // For demonstration, we'll return a placeholder URL
        return '/icons/default-profile.png';
    };

    return (
        <main className="w-full flex justify-center items-center bg-gray-200 p-10 md:p-24 min-h-screen">
            <section className="flex flex-col gap-3">
                <header className="font-bold text-xl text-center">Avion</header>
                <div className="flex flex-col gap-3 bg-white p-5 md:p-10 rounded-xl md:min-w-[440px] w-full">
                    <h1 className="font-bold text-xl">Sign Up With Email</h1>
                    <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="font-medium">First Name</label>
                                <input
                                    placeholder="Enter Your First Name"
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="px-3 py-2 rounded-xl border focus:outline-none w-full"
                                    aria-label="Enter your First Name"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="font-medium">Last Name</label>
                                <input
                                    placeholder="Enter Your Last Name"
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="px-3 py-2 rounded-xl border focus:outline-none w-full"
                                    aria-label="Enter your Last Name"
                                    required
                                />
                            </div>
                        </div>
                        <label htmlFor="gender" className="font-medium">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="px-3 py-2 rounded-xl border focus:outline-none"
                            aria-label="Select your Gender"
                            required
                        >
                            <option value="" disabled>Select Your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input
                            placeholder="Enter Your Email"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 rounded-xl border focus:outline-none"
                            aria-label="Enter your Email"
                            required
                        />
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input
                            placeholder="Enter Your Password"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-3 py-2 rounded-xl border focus:outline-none"
                            aria-label="Enter your Password"
                            required
                        />
                        <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
                        <input
                            placeholder="Confirm Your Password"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="px-3 py-2 rounded-xl border focus:outline-none"
                            aria-label="Confirm your Password"
                            required
                        />
                        <label htmlFor="profilePicture" className="font-medium">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                            className="px-3 py-2 rounded-xl border focus:outline-none"
                            aria-label="Upload your Profile Picture"
                        />
                        <Button type="submit" color="primary" isLoading={false} isDisabled={false}>Sign Up</Button>
                    </form>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <div className="flex justify-between">
                        <Link href="/login">
                            <button className="font-semibold text-sm text-blue-700">
                                Already have an account? Login
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;
