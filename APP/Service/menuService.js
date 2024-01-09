import * as menuDAL from '../DAL/menuDAL.js';
import { v1 as uuidv4 } from 'uuid';
export async function getMenuList() {
  const result = await menuDAL.getMenuList();
  return result;
}

export async function getMenuFoodDetails(menuId) {
  const [menuDetails] = await menuDAL.getMenuFoodDetails(menuId);
  if (!menuDetails) throw new Error('Menu not found');
  const foodByMenu = await menuDAL.getFoodByMenu(menuDetails.menu_id);
  menuDetails.foodDetails = foodByMenu;
  return menuDetails;
}
export async function createMenu(menuDetails, client) {
  const [menu] = await menuDAL.getMenuFoodDetailsByName(menuDetails.menu_name);
  if (menu)
    throw new Error('Menu name is already in use ' + menuDetails.menu_name);
  menuDetails.menu_id = uuidv4();
  await menuDAL.createMenu(menuDetails, client);
}
export async function updateMenuAvatar(menuId, image, client) {
  await getMenuFoodDetails(menuId);
  await menuDAL.updateMenuAvatar(menuId, image, client);
}
export async function updateMenu(menuDetails, client) {
  const [menu] = await menuDAL.getMenuFoodDetailsByName(menuDetails.menu_name);
  if (menu)
    throw new Error('Menu name is already in use ' + menuDetails.menu_name);
  const [menuDetailsById] = await menuDAL.getMenuFoodDetails(
    menuDetails.menu_id,
  );
  if (!menuDetailsById)
    throw new Error('Menu is not found ', menuDetails.menu_id);
  await menuDAL.updateMenu(menuDetails, client);
}
export async function deleteMenu(menuId, client) {
  const [menuDetailsById] = await menuDAL.getMenuFoodDetails(menuId);
  if (!menuDetailsById) throw new Error('Menu id is not found ');
  await menuDAL.deleteMenu(menuId, client);
}
