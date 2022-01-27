using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        //private readonly IHostingEnvironment _environment;
        private readonly string _bucketName;
        private IAwsService _awsService;
        private AwsOptions _options;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            //_environment = environment;
            _bucketName = "mytalentmodule1bucket";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            //Your code here;

            var path = "";
            //var uniqueId = "";

            /*if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
            {
                _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "\\");
            }*/

            //string pathWeb = this._environment.WebRootPath;

            if (id != "" && type == FileType.ProfilePhoto)
            {

                //String pathValue = pathWeb + _tempFolder;
                //uniqueId = pathValue + id;
                path = await _awsService.GetPresignedUrlObject(id, _bucketName);
                Console.WriteLine(path);
            }
            return path;

            //throw new NotImplementedException();
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();
           string path = "";

            string pathWeb = "";

           // pathWeb = _environment.WebRootPath;

            if (file != null && type == FileType.ProfilePhoto)

            {

                //string pathValue = pathWeb + _tempFolder;

                //uniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                path = file.FileName;
                //var path = uniqueFileName;

                using (var fileStream = new FileStream(path, FileMode.Create))

                {

                    await file.CopyToAsync(fileStream);

                    if (!await _awsService.PutFileToS3(path, fileStream, _bucketName))

                    {

                        path = "";

                    }

                }

            }

            return path;


        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();
            try
            {
                return await _awsService.RemoveFileFromS3(id, _bucketName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
