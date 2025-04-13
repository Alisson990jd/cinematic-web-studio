
# Running on Kaggle with GPU Support

Follow these steps to run the video editor on Kaggle with GPU acceleration:

1. Create a new notebook on Kaggle
2. Enable GPU accelerator in notebook settings
3. Upload the `kaggle-notebook.ipynb` file
4. Run all cells in sequence
5. The last cell will output a public URL where you can access your editor

Note: The ngrok URL will be displayed in the notebook output. Use this URL to access your editor remotely.

## Important Considerations
- Keep the notebook running to maintain the connection
- The ngrok URL will change each time you restart the notebook
- GPU acceleration will be automatically utilized for video processing tasks
- Make sure you have enough GPU quota on your Kaggle account

## Troubleshooting
If you encounter any issues:
1. Check that GPU accelerator is enabled
2. Verify all cells executed successfully
3. Ensure the port (8080) isn't blocked by Kaggle
4. Check ngrok logs for connection issues
