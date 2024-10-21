const Button = ({ buttonText, loading }) => {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="submit" // Keep type as submit for form submission
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <FaSpinner className="animate-spin text-white text-xl inline" />
        ) : (
          buttonText
        )}
      </button>
    );
  };

  export default Button