using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;   
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;         
        }

        public void Add(User user)
        {
            _context.Add(user);
        }
        public void Update(User user)
        {
            _context.Update(user);
        }

        public void Delete(User user)
        {
            _context.Remove(user);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<User> Select(int id)
        {
            IQueryable<User> query = _context.Users;

            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> List()
        {
            IQueryable<User> query = _context.Users;
            return await query.ToListAsync();
        }
    }
}