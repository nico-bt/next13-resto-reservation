"use client"
import { useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import AuthInputs from "./AuthInputs"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 320,
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(inputs)
    setInputs({ firstName: "", lastName: "", email: "", phone: "", city: "", password: "" })
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className={
          isSignIn
            ? "bg-blue-400 text-white border p-1 px-4 rounded mr-3"
            : "border p-1 px-4 rounded mr-3"
        }
      >
        {isSignIn ? "Sign in" : "Sign up"}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <div className="uppercase font-bold text-center pb-2 border-b mb-2">
            <p className="text-sm">{isSignIn ? "Sign in" : "Create Account"}</p>

            <div className="m-auto mt-2">
              <h2 className="text-xl font-light text-center">
                {isSignIn ? "Log into your Account" : "Create your OpenTable Account"}
              </h2>
            </div>
          </div>

          <AuthInputs inputs={inputs} handleChangeInput={handleChangeInput} isSignin={isSignIn} />

          <button
            type="submit"
            className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
          >
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </Box>
      </Modal>
    </div>
  )
}
