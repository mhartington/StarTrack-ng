
export function mapToResults(result: any) {
  return {
    hasError: false,
    isLoading: false,
    collection: result
  };
}


export function mapToAlbumResults(result: any) {
  return {
    hasError: false,
    isLoading: false,
    collection: result,
    canShare: !!('share' in navigator)
  };
}

export function mapToError(error: any) {
  return {
    hasError: true,
    isLoading: false,
    collection: null
  };
}
