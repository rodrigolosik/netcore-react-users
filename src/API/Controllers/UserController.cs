using System.Threading.Tasks;
using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
         private readonly IUserRepository _repo;

        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }
        
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.List());
        }

        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _repo.Select(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            if (user != null)
            {
                _repo.Add(user);
                await _repo.SaveChangesAsync();
                return Created($"/api/evento/{user.Id}", user);
            }
            else
                return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            var users = await _repo.Select(id);

            if(users == null)
                return BadRequest();

            user.Id = id;   
            _repo.Update(user);
            await _repo.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _repo.Select(id);

            if (user == null)
                return NotFound();

            _repo.Delete(user);
            await _repo.SaveChangesAsync();

            return Ok();
        }
    }
}