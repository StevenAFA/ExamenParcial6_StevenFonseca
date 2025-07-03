using ExamenParcial6_StevenFonseca.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace ExamenParcial6_StevenFonseca.Data
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options) { }
        public DbSet<Tarea> Tareas { get; set; }
    }
}
