import * as serviceSQL from '../SQL/serviceSQL.js';
import { pool } from '../utility/DbHelper.js';
export async function getServiceList() {
  const getServiceListQuery = serviceSQL.getServiceList();
  const getServiceList = await pool.query(getServiceListQuery);
  return getServiceList.rows;
}

export async function getSalePackageDetails(salePackageId) {
  const getSalePackageDetailsQuery =
    serviceSQL.getSalePackageDetails(salePackageId);
  const salePackageDetails = await pool.query(getSalePackageDetailsQuery);
  return salePackageDetails.rows;
}

export async function getSalePackageDetailsByName(salePackageName) {
  const getSalePackageDetailsQuery =
    serviceSQL.getSalePackageDetailsByName(salePackageName);
  const salePackageDetails = await pool.query(getSalePackageDetailsQuery);
  return salePackageDetails.rows;
}
export async function createSalePackage(salePackageDetails) {
  const createSalePackageQuery =
    serviceSQL.createSalePackage(salePackageDetails);
  await client.query(createSalePackageQuery);
}
export async function updateSalePackage(salePackageDetails) {
  const updateSalePackageQuery =
    serviceSQL.updateSalePackage(salePackageDetails);
  await client.query(updateSalePackageQuery);
}
export async function deleteSalePackage(salePackageId) {
  const deleteSalePackageQuery = serviceSQL.deleteSalePackage(salePackageId);
  await client.query(deleteSalePackageQuery);
}
