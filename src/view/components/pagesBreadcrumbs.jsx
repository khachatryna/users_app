import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';


function PagesBreadcrumbs() {
  const [pathList, setPathList] = useState([])
  let location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      const list = location.pathname.split("/");
      list.shift();
      setPathList(list)
    }
  }, [location]);

    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs">
          <RouterLink  to="/">
            <Link underline="hover" color="inherit" component="div">
              <GitHubIcon  sx={{ mr: 0.5 }} fontSize="inherit"/> 
            </Link>
          </RouterLink>
          {
            pathList.map((path, index) => (
              <div key={index}>
              {index === pathList.length -1 ?  <Typography color="text.primary">{path}</Typography> : 
              <RouterLink to={"/"+path}>
                <Link underline="hover" color="inherit" component="div">
                 {path}
                </Link>     
              </RouterLink>
               }
              </div>

            ))
          }
        </Breadcrumbs>
      </div>
    )
}

export default PagesBreadcrumbs