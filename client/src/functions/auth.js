import axios from 'axios'

const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,{},
      {
        headers : {
          authtoken,
        }
      }
    )
  }

  const currentUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,{},
      {
        headers : {
          authtoken,
        }
      }
    )
  }

  