import React from 'react';
import styled from "styled-components";
import { ProfileInputProps } from "../../model/profile/profile"

const Input = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #dddddd;
  outline: none;

  &:focus {
    border: 1px solid #f87878;
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  padding: 5px 0;
  margin-left: 5px;
`;

const ProfileInput: React.FC<ProfileInputProps> = React.memo(({type, name, value, placeholder, required, onChange, disabled, error})=> (
    <>
    <Input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
    disabled={disabled}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
))

export default ProfileInput;