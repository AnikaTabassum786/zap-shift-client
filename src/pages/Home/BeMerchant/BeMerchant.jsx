import React from 'react';
import img from '../../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div data-aos='zoom-in-up' className=" bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] rounded-4xl p-20 mb-10">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={img}
      className="max-w-sm rounded-lg "
    />
    <div>
      <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6 text-white">
       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
      <button className="btn  rounded-full bg-[#CAEB66]">Become a Merchant</button>
      <button className="btn btn-outline rounded-full bg-[#CAEB66]  ml-4">Earn with Profast Courier</button>
    </div>
  </div>
</div>
    );
};

export default BeMerchant;