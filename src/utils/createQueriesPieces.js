const createQueriesPieces = (arr) => {
  let queryPiece = "";
  let middleTableQueryPiece = "";

  arr.forEach((value, index) => {
    queryPiece += ` ($${index + 1}),`;
    middleTableQueryPiece += ` ($${arr.length + 1}, $${index + 1}),`;
  });

  queryPiece = queryPiece.substring(0, queryPiece.length - 1);

  middleTableQueryPiece = middleTableQueryPiece.substring(
    0,
    middleTableQueryPiece.length - 1
  );

  return {
    postQueryPiece: queryPiece,
    middleTableQueryPiece: middleTableQueryPiece,
  };
};

export default createQueriesPieces;
