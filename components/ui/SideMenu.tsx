import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, UIContext } from '../../context';

import {
   Box,
   Divider,
   Drawer,
   IconButton,
   Input,
   InputAdornment,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListSubheader,
} from '@mui/material';

import {
   AccountCircleOutlined,
   AdminPanelSettings,
   CategoryOutlined,
   ConfirmationNumberOutlined,
   EscalatorWarningOutlined,
   FemaleOutlined,
   LoginOutlined,
   MaleOutlined,
   SearchOutlined,
   VpnKeyOutlined,
} from '@mui/icons-material';

export const SideMenu = () => {
   const router = useRouter();
   const { isLoggedIn, user, logout } = useContext(AuthContext);

   const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
   const [searchTerm, setSearchTerm] = useState('');

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      navigateTo(`/search/${searchTerm}`);
   };

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   };

   return (
      <Drawer
         open={isMenuOpen}
         onClose={toggleSideMenu}
         anchor='right'
         sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}>
         <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
               <ListItem>
                  <Input
                     autoFocus
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
                     type='text'
                     placeholder='Buscar...'
                     endAdornment={
                        <InputAdornment position='end'>
                           <IconButton onClick={onSearchTerm}>
                              <SearchOutlined />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </ListItem>

               <ListItem button sx={{ display: isLoggedIn ? 'flex' : 'none' }}>
                  <ListItemIcon>
                     <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'My Profile'} />
               </ListItem>

               <ListItem
                  button
                  sx={{ display: isLoggedIn ? 'flex' : 'none' }}
                  onClick={() => navigateTo('/orders/history')}>
                  <ListItemIcon>
                     <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'My Orders'} />
               </ListItem>

               <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                  <ListItemIcon>
                     <MaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Men'} onClick={() => navigateTo('/category/men')} />
               </ListItem>

               <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                  <ListItemIcon>
                     <FemaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Women'} onClick={() => navigateTo('/category/women')} />
               </ListItem>

               <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                  <ListItemIcon>
                     <EscalatorWarningOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Kids'} onClick={() => navigateTo('/category/kids')} />
               </ListItem>

               {!isLoggedIn ? (
                  <ListItem button onClick={() => navigateTo(`/auth/login?page=${router.asPath}`)}>
                     <ListItemIcon>
                        <VpnKeyOutlined />
                     </ListItemIcon>
                     <ListItemText primary={'Login'} />
                  </ListItem>
               ) : (
                  <ListItem button onClick={logout}>
                     <ListItemIcon>
                        <LoginOutlined />
                     </ListItemIcon>
                     <ListItemText primary={'Logout'} />
                  </ListItem>
               )}

               {/* Admin */}
               {user?.role === 'admin' && (
                  <>
                     <Divider />
                     <ListSubheader>Admin Panel</ListSubheader>

                     <ListItem button>
                        <ListItemIcon>
                           <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                     </ListItem>
                     <ListItem button>
                        <ListItemIcon>
                           <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                     </ListItem>

                     <ListItem button>
                        <ListItemIcon>
                           <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                     </ListItem>
                  </>
               )}
            </List>
         </Box>
      </Drawer>
   );
};
