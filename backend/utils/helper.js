export const emptyList = (res) => {
    return res.status(200).json({
      status: "success",
      data: {
        results: 0,
        message: "There are currently no items in the list",
      },
    });
  };