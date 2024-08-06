import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupType } from '@uzumaki_18/common'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

//trpc

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate()
  const [postInputs, setpostInputs] = useState<signupType>({
    name: '',
    email: '',
    password: '',
  })

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      )
      const jwt = response.data
      localStorage.setItem('token', jwt)
      navigate('/blog')
    } catch (error) {
      alert('Error while signing up')
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className=" text-3xl font-bold">Create an account</div>
            <div className="text-slate-400">
              {type === 'signin'
                ? "Don't have an account"
                : 'Already have an account?'}
              <Link
                className="pt-2 underline"
                to={type === 'signin' ? '/signup' : '/signin'}
              >
                {type === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type === 'signup' ? (
              <LabelledInput
                label="Name"
                placeholder="Satyam Srinath..."
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  })
                }}
              />
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="satyamsri1809@gmail.com"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                })
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="135435"
              type="password"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                })
              }}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="text-white mt-4 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LabelledInputType {
  placeholder: string
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm  text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || 'text'}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  )
}
