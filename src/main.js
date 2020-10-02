import readImageFile from 'itk/readImageFile';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';

export function outputFileInformation(element, event) {
  element.textContent = 'Loading...';

  const dataTransfer = event.dataTransfer;
  const files = event.target.files || dataTransfer.files;

  if (files.length === 1) {
    return readImageFile(null, files[0])
      .then(function ({ image, webWorker }) {
        if (webWorker)
          webWorker.terminate();
        printImage(element, image);
      })
  } else {
    return readImageDICOMFileSeries(files)
      .then(function ({ image, webWorkerPool: { workerQueue }}) {
        if (workerQueue) {
          workerQueue
            .filter(worker => worker != null)
            .forEach(worker => worker.terminate())
        }
        printImage(element, image);
      })
  }
}

function printImage(element, image) {
  function replacer(key, value) {
    if (!!value && value.byteLength !== undefined) {
      return String(value.slice(0, 6)) + '...';
    }
    return value;
  }

  element.textContent = JSON.stringify(image, replacer, 4)
}