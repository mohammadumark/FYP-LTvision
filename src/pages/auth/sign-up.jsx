import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    bloodGroup: '',
    hospitalName: '',
    description: '', // New field for description
    specialty: '' // New field for specialty
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, bloodGroup: value });
  };

  const handleSpecialtyChange = (value) => {
    setFormData({ ...formData, specialty: value });
  };

  const handleHospitalChange = (value) => {
    setFormData({ ...formData, hospitalName: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/auth/sign-in');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your details to register.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Input size="lg" label="Username" name="username" value={formData.username} onChange={handleChange} />
            <Input size="lg" label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input size="lg" type="password" label="Password" name="password" value={formData.password} onChange={handleChange} />
            <Input size="lg" type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            <Input size="lg" label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

            <Select label="Blood Group" size="lg" value={formData.bloodGroup} onChange={handleSelectChange}>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
            </Select>

            {/* Description Field */}
            <Input size="lg" label="Description" name="description" value={formData.description} onChange={handleChange} />

            {/* Specialty Dropdown */}
            <Select label="Specialty" size="lg" value={formData.specialty} onChange={handleSpecialtyChange}>
              <Option value="Liver Surgeon">Liver Surgeon</Option>
              <Option value="Hepatologist">Hepatologist</Option>
              <Option value="Oncologist">Oncologist</Option>
              <Option value="Radiologist">Radiologist</Option>
              <Option value="Gastroenterologist">Gastroenterologist</Option>
            </Select>

            {/* Hospital Dropdown */}
            <Select label="Hospital Name" size="lg" value={formData.hospitalName} onChange={handleHospitalChange}>
              {/* List of hospitals in Punjab, Pakistan */}
              <Option value="Lahore General Hospital">Lahore General Hospital</Option>
              <Option value="Mayo Hospital Lahore">Mayo Hospital Lahore</Option>
              <Option value="Punjab Institute of Cardiology">Punjab Institute of Cardiology</Option>
              <Option value="Services Hospital Lahore">Services Hospital Lahore</Option>
              {/* Add more hospitals as required */}
            </Select>
          </div>

          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
