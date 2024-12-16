export function EmptyState() {
  return (
    <div className="mb-8 text-center py-8 bg-muted/30 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">No Favorite Stations Yet</h2>
      <p className="text-muted-foreground">
        Add stations to your favorites by clicking the star icon
      </p>
    </div>
  );
}