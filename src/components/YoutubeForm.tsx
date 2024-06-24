import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Props = {};

type formValues = {
  username: string;
  email: string;
  channel: string;
  social:{
    facebook: string;
    twitter: string;
  };
  phoneNumbers: ["",""]
};


//dafault values from backend or dynamic default values

const YoutubeForm = (props: Props) => {
  const form = useForm<formValues>({
    defaultValues : async ()=>{
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const data =await response.json()
        return {
            username : data?.name,
            email: data?.email,
            channel:'',
            social: {
                facebook:'',
                twitter:''
            }
        }
    }
}
  );

  // default values with object

//   const YoutubeForm = (props: Props) => {
//     const form = useForm<formValues>({
//       defaultValues :{
//               username : "Muneeb Ahmad",
//               email: "youremail@email.com",
//               channel:'Channel Name',
//               social: {
//                   facebook:'',
//                   twitter:''
//               }
//           }
//       }
//     )};


  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  // const {name, ref, onChange, onBlur} = register('username');

  const onSubmit = (data: formValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            placeholder='User name'
            type='text'
            id='username'
            {...register("username", {
              required: "user name is required",
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='email@email.com'
            type='email'
            id='email'
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              required: {
                value: true,
                message: "required",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "this email has already been taken"
                  );
                },
                notBlackDOmain:(fieldValue)=>{
                    return(
                        !fieldValue.endsWith('example.com') || 
                        'this domain is not supported'
                    )
                }
              },
            })}
          />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Username</label>
          <input
            placeholder='Enter channel name'
            type='text'
            id='channel'
            {...register("channel", {
              required: "channel name is required",
            })}
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>facebook</label>
          <input
            placeholder='Enter facebook profile'
            type='text'
            id='facebook'
            {...register("social.facebook")}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Twitter</label>
          <input
            placeholder='Enter twitter profile'
            type='text'
            id='twitter'
            {...register("social.twitter")}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary Number</label>
          <input
            placeholder='Enter primary Phone"
            type='text'
            id='primary-phone'
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='primary-phone'>Secondary Number</label>
          <input
            placeholder='Enter secondary Phone"
            type='text'
            id='secondary-phone'
            {...register("phoneNumbers.1")}
          />
        </div>
        
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default YoutubeForm;
