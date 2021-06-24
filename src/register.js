import React, {useRef, useState} from "react";
import { useForm } from "react-hook-form";

import useFormPersist from "react-hook-form-persist";
import "./register.css";

export default function Form() {
  const {
    register,
    formState: { errors  },
    watch,
    setValue,
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });
  useFormPersist('form', {watch, setValue}, { exclude: ["password","confirmPassword"] });

  const password = useRef({});
  const [formSubmitted, setFormSubmitted] = useState();
  password.current = watch("password", "");

  const eighteenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  const eighteenYearsAgoDate = eighteenYearsAgo.toISOString().split('T')[0];
  const ageValidate = (value) => {
    if (value) {
      function _getAge(dob) {
        var ageDifMs = Date.now() - dob.getTime();
  
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      let birthday = new Date(value);
      let age = _getAge(birthday);
      const ageRegex = /^(?:[5-9]|100|1[0-9]|[1-9][0-9])$/;
      return !!String(age).match(ageRegex);
    }
    return true;
  };

  const onSubmit = (data) => {
    setFormSubmitted(true);
    console.log(JSON.stringify(data));
    reset({})
  };
  console.log(errors);

  return (
    <div>
      { formSubmitted && (<div className="last-msg"><h1 >Your registeration  has be Successful. Have a great day ahead and stay safe. </h1></div> )}
      { !formSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <h1>Registeration Form</h1>
        
          <label>First name *</label>
          <input
            placeholder="Enter your First Name"
            type="text"
            data-testid="firstName"
            {...register("firstName", {
              required: "First name is a required",
              maxLength: {
                value: 30,
                message: "Maximum allowed length is 30"
              }
            })}
          />
          {errors.firstName && <p className='error'>{errors.firstName.message}</p>}

          <label>Last name *</label>
          <input
            placeholder="Enter your Last Name"
            type="text"
            data-testid="lastName"
            {...register("lastName", {
              required: "Last name is a required",
              maxLength: {
                value: 20,
                message: "Maximum allowed length is 20"
              }
            })}
          />
          {errors.lastName && <p className='error'>{errors.lastName.message}</p>}

          <label>Nick name/Preferred name</label>
          <input
            placeholder="Enter your Middle Name"
            type="text"
            data-testid="middleName"
            {...register("middleName", {
              maxLength: {
                value: 20,
                message: "Maximum allowed length is 20"
              }
            })}
          />
          {errors.middleName && <p className='error'>{errors.middleName.message}</p>}

          <label>Gender *</label>
          <select
            name="Title"
            data-testid="title"
            {...register("title", {
              required: "Gender is required pick 3rd option if you don't want to answer."
            })}
          >
            <option value="">Select Gender</option>
            <option value="Mr">Male</option>
            <option value="Miss">Female</option>
            <option value="Mrs">Prefer no to say</option>
          </select>
          {errors.title && <p className='error'>{errors.title.message}</p>}

          <label>Date Of Birth *</label>
          <input
            type="date"
            data-testid="dob"
            max={eighteenYearsAgoDate}
            placeholder="Enter your DOB ex:YYYY-MM-DD"
            {...register("dob", {
              required: "Date Of Birth is required",
              pattern: {
                value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                message: "Must be a valid date in the format YYYY-MM-DD"
              },
              validate: ageValidate,
            })}
          />
          {errors.dob && errors.dob.type !== "validate" && <p className='error'>{errors.dob.message}</p>}
          {errors.dob && errors.dob.type === "validate" && <p className='error'>Min age should be 18</p>}

          <label>Email Address *</label>
          <input
            type="text"
            placeholder="Enter your Email Address"
            data-testid="email"
            {...register("email", {
              required: "Please enter your valid email address",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}

          <label>Mobile Number *</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            data-testid="mobileNumber"
            {...register("mobileNumber", {
              required: "Password is required",
              maxLength: {
                value: 13,
                message: "Max length is 13"
              },
              minLength: {
                value: 8,
                message: "Max length is 8"
              }
            })}
          />
          {errors.mobileNumber && <p className='error'>{errors.mobileNumber.message}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            data-testid="password"
            {...register("password", {
              required: "Re-enter you password",
              minLength: {
                value: 6,
                message: "Must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className='error'>{errors.password.message}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            data-testid="confirmPassword"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: value => value === password.current || "The passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}

          <label>Would you like us to save your Information in our Database? *</label>
          <p><label>
          <input
            type="radio"
            data-testid="location"
            value="Yes"
            {...register("location", { required: "Location is required" })}
          /> Yes </label>
          <label>
          <input
            type="radio"
            value="No"
            {...register("location", { required: "Location is required" })}
          /> No
          </label>
          </p>
          {errors.location && <p className='error'>{errors.location.message}</p>}

          
          <label htmlFor="acceptTerms" className="form-check-label"> 
          <input
            type="checkbox"
            data-testid="acceptTerms"
            {...register("acceptTerms", {
              required: "You need to accept our TnC in order to proceed",
            })}
          /> I hereby accept terms and conditions *</label>
          {errors.acceptTerms && <p className='error'>{errors.acceptTerms.message}</p>}

          <label>Please note all the fields with ( * ) are mandatory fields.</label>


          <input type="submit" value="Register" data-testid="submit"/>
        </form>
      )}
    </div>
  );
}