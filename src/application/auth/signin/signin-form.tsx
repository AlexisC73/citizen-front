import { SigninFormBase } from "./signin-form-base";

export function SigninForm() {
  return (
    <SigninFormBase
      signin={async (props) => {
        console.log(props);
      }}
    />
  );
}
