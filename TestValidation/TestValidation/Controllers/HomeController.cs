using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestValidation.Models;

namespace TestValidation.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public string TestAjax()
        {
            return "Ajax is ok";
        }

        [HttpGet]
        public ActionResult CreateNewPerson()
        {
            Person model = new Person();
            return PartialView(model);
        }
        [HttpPost]
        public ActionResult CreateNewPerson(Person data)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(x => x.Value.Errors.Count > 0)
                .Select(x => new
                {
                    Key = x.Key,
                    Errors = x.Value.Errors.Select(e => e.ErrorMessage)
                });
                return Json(new { success = false, errors = errors }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                /*Here can save into db*/
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
