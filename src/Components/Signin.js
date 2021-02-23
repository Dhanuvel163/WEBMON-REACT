import React from 'react'
import {
  Button,FormControl,FormLabel,Heading,Input,Stack,Divider,useToast
} from '@chakra-ui/react';
import {
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure
} from "@chakra-ui/react"
import { Formik } from 'formik';
import Formerror from './Formerror'
import {postusersignin,postusersignup} from '../shared/actionCreators'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
const mapStateToProps=state=>{
    return {
    }
}
const mapDispatchToProps=dispatch=>({
    postusersignin:(values,toast)=>dispatch(postusersignin(values,toast)),
    postusersignup:(values,toast)=>dispatch(postusersignup(values,toast)),
})

function Signin(props) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Divider/>

            <Formik
            initialValues={{ email: '', password: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Email is Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }                                    
                if (!values.password) {
                errors.password = 'Password is Required';
                }  
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                props.postusersignin(values,toast)
                setSubmitting(false);
            }}
            >
            {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
              <>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormControl>
                {errors.email && touched.email && <Formerror>{errors.email}</Formerror>}
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </FormControl>
                {errors.password && touched.password && <Formerror>{errors.password}</Formerror>}

                <Stack spacing={6}>
                  <Button onClick={handleSubmit} colorScheme={'blue'} variant={'solid'}>
                    Sign in
                  </Button>
                  <Divider/>
                  <Button onClick={onOpen} colorScheme={'green'} variant={'solid'}>
                    Sign up
                  </Button>
                </Stack>
              </>
            )}
            </Formik>

                <Formik
                initialValues={{ email: '', password: '',username:'',mobile:'' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                    errors.email = 'Email is Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    if (!values.username) {
                    errors.username = 'Username is Required';
                    } else if (values.username.length<6 || values.username.length>20) {
                    errors.username = 'Username should have minimum 6 characters and maximum 20 characters';
                    }                                    
                    if (!values.password) {
                    errors.password = 'Password is Required';
                    } else if (values.password.length<6 || values.password.length>20) {
                    errors.password = 'Password should have minimum 6 characters and maximum 20 characters';
                    }   
                    if (!values.mobile) {
                    errors.mobile = 'Phone Number is Required';
                    } else if (values.mobile.length!==10) {
                    errors.mobile = 'Phone Number should have 10 characters';
                    }   
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    props.postusersignup(values,toast)
                    setSubmitting(false);
                }}
                >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Signup</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                          <FormControl id="name">
                            <FormLabel>Username</FormLabel>
                            <Input type="text"
                              name="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                            />
                          </FormControl>
                          {errors.username && touched.username && <Formerror>{errors.username}</Formerror>}
                          <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </FormControl>
                          {errors.email && touched.email && <Formerror>{errors.email}</Formerror>}
                          <FormControl id="mobile">
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="text"
                              name="mobile"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.mobile}
                            />
                          </FormControl>
                          {errors.mobile && touched.mobile && <Formerror>{errors.mobile}</Formerror>}
                          <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"
                              name="password"
                              className="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </FormControl>
                          {errors.password && touched.password && <Formerror>{errors.password}</Formerror>}
                      </ModalBody>

                      <ModalFooter>
                        <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button colorScheme={'green'} onClick={handleSubmit}>Signup</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                )}
                </Formik>
        </Stack> 
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signin));