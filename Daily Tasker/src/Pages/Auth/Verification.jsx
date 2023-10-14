import PropTypes from "prop-types";

const Verification = ({ register, handleInput }) => {
  return (
    <div className="z-10 bg-black bg-opacity-30 fixed top-0 left-0 h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg w-[350px]">
        <h1 className="font-semibold text-2xl text-center mb-8">
          Verification
        </h1>
        <form onSubmit={register}>
          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Email Verification
            </label>
            <input
              type="number"
              name="otp_email"
              value={handleInput.otp_email}
              required
              onChange={(e) => handleInput(e)}
              placeholder="otp..."
              className="p-2 rounded-md border border-gray-300 w-full"
            />
          </div>

          {/* <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Mobile Verification
            </label>
            <input
              type="number"
              name="otp_phone"
              value={handleInput.otp_phone}
              required
              onChange={(e) => handleInput(e)}
              placeholder="otp..."
              className="p-2 rounded-md border border-gray-300 w-full"
            />
          </div> */}

          <div className="mb-5">
            <button className="border-none outline-none rounded-3xl p-2 px-3 font-semibold text-white text-center bg-[#05C46B] cursor-pointer hover:bg-[#40c587] duration-300 w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;

Verification.propTypes = {
  register: PropTypes.func,
  handleInput: PropTypes.func,
};
