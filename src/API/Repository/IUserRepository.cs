using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repository
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(User user);
        void Update(User user);
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<User>> List();
        Task<User> Select(int id);
    }
}