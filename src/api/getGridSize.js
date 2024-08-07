export async function getGridSize() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(5);
      }, 1000);
    });
  }