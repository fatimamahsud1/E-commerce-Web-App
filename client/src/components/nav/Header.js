import React, { useState, } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import firebase from 'firebase'
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch()
  const navigate = useNavigate()
  let {user} = useSelector((state) => ({...state}))


  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type : "LOGOUT",
      payload:null
    })
    navigate("/login")
  }


  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to = './'>  Home</Link>
       
      </Item>
      {
          user && (
            <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined/>} onClick={logout}>Option 2</Item>  
          </SubMenu>
          )
        }
    


      {
          !user && (
            <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to = './login'>Login</Link>   
            </Item>

          )
        }
     
     
        {
          !user && (

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to = './register'>Register</Link>
            </Item>
          )
        }
      
     
      
    </Menu>
  );
};

export default Header;