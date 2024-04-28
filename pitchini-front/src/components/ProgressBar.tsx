const ProgressBar = ({ value, label }) => {
  // Calculate the percentage value based on the provided value

  const progressStyle = {
    width: "300px", // Customize the width of the progress bar
  };

  const progressBarFillStyle = {
    backgroundColor: "#646161", // Customize the color of the progress bar fill
    borderRadius: "7px", // Apply border radius to the progress bar fill
  };
  return (
    <div>
      <div className="flex justify-start items-start flex-col">
        <p>{label}</p>
        <progress style={progressStyle} value={value} max={100}></progress>
      </div>
      <style>
        {`
          progress::-webkit-progress-bar {
            background-color: #c4c4c4;
            border-radius: 7px;
          }
          progress::-webkit-progress-value {
            background-color: ${progressBarFillStyle.backgroundColor};
            border-radius: ${progressBarFillStyle.borderRadius};
          }
        `}
      </style>
    </div>
  );
};

export default ProgressBar;
