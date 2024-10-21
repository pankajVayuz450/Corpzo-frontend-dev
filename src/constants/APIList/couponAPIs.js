//ALL Admin auth APis are listed here, modify here if want any changes in any API string
const BASE_URL = process.env.BACKEND_BASE_URL;

const couponAPIs = {
    createCoupon:`${BASE_URL}/admin/coupon`,
    getAllCoupons:`${BASE_URL}/admin/coupon`,
    updateCouponById:`${BASE_URL}/admin/coupon`,
    getCouponById:`${BASE_URL}/admin/coupon`,
    deleteCouponById:`${BASE_URL}/admin/coupon`,
}
export default couponAPIs;