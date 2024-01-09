import * as serviceDAL from '../DAL/serviceDAL.js';
import * as menuDAL from '../DAL/menuDAL.js';
import { v1 as uuidv4 } from 'uuid';
export async function getServiceList() {
  const result = await serviceDAL.getServiceList();
  return result;
}

export async function getSalePackageDetails(salePackageId) {
  const [result] = await serviceDAL.getSalePackageDetails(salePackageId);
  if (!result)
    throw new Error(
      'Could not find sale-package details by sale-package id ' + salePackageId,
    );
  return result;
}
export async function createSalePackage(salePackageDetails, client) {
  const salePackage = await serviceDAL.getSalePackageDetailsByName(
    salePackageDetails.name,
  );
  if (salePackage) throw new Error('This sale package name already exists');

  const [menuDetails] = await menuDAL.getMenuDetails(
    salePackageDetails.menu_id,
  );
  if (!menuDetails) throw new Error(`Menu not found for create sale package `);

  salePackageDetails.sale_package_id = uuidv4();
  salePackageDetails.price = menuDetails.menu_price;
  await serviceDAL.createSalePackage(salePackageDetails, client);
}
export async function updateSalePackage(salePackageDetails, client) {
  const salePackage = await serviceDAL.getSalePackageDetailsByName(
    salePackageDetails.name,
  );
  if (salePackage) throw new Error('This sale package name already exists');

  const [menuDetails] = await menuDAL.getMenuDetails(
    salePackageDetails.menu_id,
  );
  if (!menuDetails) throw new Error(`Menu not found for update sale package `);
  salePackageDetails.type = menuDetails.type;
  salePackageDetails.price = menuDetails.menu_price;
  await serviceDAL.updateSalePackage(salePackageDetails, client);
}
export async function deleteSalePackage(salePackageId, client) {
  const [result] = await serviceDAL.getSalePackageDetails(salePackageId);
  if (!result) throw new Error('Could not find sale-package details');
  await serviceDAL.deleteSalePackage(salePackageId, client);
}
