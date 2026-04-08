const jwt = require("jsonwebtoken");
const voucherModel = require("../Models/VoucherModel");

const getListVoucher = async (req, res) => {
  try {
    const vouchers = await voucherModel.find();
    return res.status(200).send(vouchers);
  } catch (error) {
    console.log("getListVoucher error", error);
    return res.status(500).json({ error: "Cannot fetch vouchers" });
  }
};

const postVoucher = async (req, res) => {
  try {
    const {
      voucherName,
      type,
      discountType,
      discount,
      maximumDiscount,
      appliedFor,
      pic,
    } = req.body;

    await voucherModel.create({
      voucherName: voucherName,
      type: type,
      discountType: discountType,
      discount: discount,
      maximumDiscount: maximumDiscount,
      appliedFor: appliedFor,
      pic: pic,
    });
    return res.status(200).send("create voucher successfully");
  } catch (error) {
    console.log("postVoucher error", error);
    return res.status(500).json({ error: "Cannot create voucher" });
  }
};

const deleteVoucher = async (req, res) => {
  try {
    const voucherId = req.params.voucherId;
    const deleted = await voucherModel.findByIdAndDelete(voucherId);
    if (!deleted) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    return res.status(200).send("delete voucher successfully");
  } catch (error) {
    console.log("deleteVoucher error", error);
    return res.status(500).json({ error: "Cannot delete voucher" });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const voucherId = req.params.voucherId;
    const updateData = req.body;

    const updated = await voucherModel.findByIdAndUpdate(
      voucherId,
      updateData,
      { new: true },
    );
    if (!updated) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    return res.status(200).send("update voucher successfully");
  } catch (error) {
    console.log("updateVoucher error", error);
    return res.status(500).json({ error: "Cannot update voucher" });
  }
};

module.exports = {
  getListVoucher: getListVoucher,
  postVoucher: postVoucher,
  deleteVoucher: deleteVoucher,
  updateVoucher: updateVoucher,
};
